import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: true,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: 'customer' // Default role
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      error: false,
      message: 'Registration successful',
      token,
      user: user.toSafeObject()
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Please provide email and password'
      });
    }

    // Check for user (include password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        error: true,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        error: true,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      error: false,
      message: 'Login successful',
      token,
      user: user.toSafeObject()
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    // req.user is set by protect middleware
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    res.status(200).json({
      error: false,
      user: user.toSafeObject()
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      error: false,
      message: 'Profile updated successfully',
      user: user.toSafeObject()
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/v1/auth/password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: true,
        message: 'Please provide current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: true,
        message: 'New password must be at least 6 characters'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isPasswordMatch = await user.comparePassword(currentPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({
        error: true,
        message: 'Current password is incorrect'
      });
    }

    // Set new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      error: false,
      message: 'Password changed successfully'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (client-side token removal)
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    // With JWT, logout is primarily handled client-side
    // This endpoint is for logging purposes or if using refresh tokens
    
    res.status(200).json({
      error: false,
      message: 'Logout successful'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Request password reset
// @route   POST /api/v1/auth/password-reset
// @access  Public
export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Please provide email address'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists
      return res.status(200).json({
        error: false,
        message: 'If an account exists with this email, a password reset link will be sent'
      });
    }

    // TODO: Generate reset token and send email
    // For now, just return success
    // In production, implement:
    // 1. Generate crypto token
    // 2. Save hashed token to user.resetPasswordToken
    // 3. Set expiry (e.g., 1 hour)
    // 4. Send email with reset link

    res.status(200).json({
      error: false,
      message: 'If an account exists with this email, a password reset link will be sent'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Reset password with token
// @route   POST /api/v1/auth/password-reset/confirm
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        error: true,
        message: 'Please provide token and new password'
      });
    }

    // TODO: Implement token validation
    // For now, just return error
    // In production, implement:
    // 1. Find user by hashed token
    // 2. Check if token is not expired
    // 3. Update password
    // 4. Clear reset token fields

    res.status(400).json({
      error: true,
      message: 'Password reset functionality not yet implemented'
    });

  } catch (error) {
    next(error);
  }
};
