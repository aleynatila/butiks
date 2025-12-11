import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `Butiks <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;

  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email');
  }
};

// Welcome email
export const sendWelcomeEmail = async (user) => {
  const subject = 'Butiks\'e Hoş Geldiniz! 🎉';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Merhaba ${user.firstName}!</h2>
      <p>Butiks ailesine hoş geldiniz. Hesabınız başarıyla oluşturuldu.</p>
      <p>Şimdi binlerce ürün arasından alışveriş yapabilir, favori butiklerinizi takip edebilirsiniz.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}" 
           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Alışverişe Başla
        </a>
      </div>
      <p style="color: #666; font-size: 14px;">İyi alışverişler dileriz!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">© 2025 Butiks. Tüm hakları saklıdır.</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject,
    html,
    text: `Merhaba ${user.firstName}, Butiks'e hoş geldiniz!`
  });
};

// Order confirmation email
export const sendOrderConfirmationEmail = async (order, user) => {
  const subject = `Siparişiniz Alındı - ${order.orderNumber}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Siparişiniz Alındı! ✅</h2>
      <p>Merhaba ${user.firstName},</p>
      <p>Siparişiniz başarıyla alındı ve işleme koyuldu.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Sipariş Detayları</h3>
        <p><strong>Sipariş No:</strong> ${order.orderNumber}</p>
        <p><strong>Toplam:</strong> ${order.total.toFixed(2)} TL</p>
        <p><strong>Ödeme Durumu:</strong> ${order.payment.status === 'paid' ? 'Ödendi' : 'Beklemede'}</p>
      </div>

      <h3>Ürünler:</h3>
      ${order.vendorOrders.map(vo => `
        <div style="margin-bottom: 15px;">
          ${vo.items.map(item => `
            <p>• ${item.name} x${item.quantity} - ${item.price.toFixed(2)} TL</p>
          `).join('')}
        </div>
      `).join('')}

      <div style="margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/orders/${order._id}" 
           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Siparişi Görüntüle
        </a>
      </div>

      <p style="color: #666; font-size: 14px;">Siparişinizle ilgili güncellemeler için size e-posta göndereceğiz.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">© 2025 Butiks. Tüm hakları saklıdır.</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject,
    html,
    text: `Siparişiniz alındı - ${order.orderNumber}`
  });
};

// Vendor approval email
export const sendVendorApprovalEmail = async (vendor, user) => {
  const subject = 'Satıcı Başvurunuz Onaylandı! 🎉';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Tebrikler ${user.firstName}!</h2>
      <p>Satıcı başvurunuz onaylandı. Artık Butiks'te ürün satabilirsiniz.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Butik Bilgileriniz</h3>
        <p><strong>Butik Adı:</strong> ${vendor.shopName}</p>
        <p><strong>Komisyon Oranı:</strong> %${vendor.commissionRate}</p>
      </div>

      <div style="margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/vendor/dashboard" 
           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Satıcı Paneline Git
        </a>
      </div>

      <p style="color: #666; font-size: 14px;">Ürün eklemeye hemen başlayabilirsiniz!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">© 2025 Butiks. Tüm hakları saklıdır.</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject,
    html,
    text: `Satıcı başvurunuz onaylandı!`
  });
};

// Order status update email
export const sendOrderStatusEmail = async (order, user, status) => {
  const statusMessages = {
    confirmed: 'Onaylandı ✅',
    processing: 'Hazırlanıyor 📦',
    shipped: 'Kargoya Verildi 🚚',
    delivered: 'Teslim Edildi 🎉',
    cancelled: 'İptal Edildi ❌'
  };

  const subject = `Sipariş Durumu: ${statusMessages[status]} - ${order.orderNumber}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Sipariş Durumu Güncellendi</h2>
      <p>Merhaba ${user.firstName},</p>
      <p>Sipariş numarası <strong>${order.orderNumber}</strong> durumu güncellendi.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Yeni Durum: ${statusMessages[status]}</h3>
      </div>

      <div style="margin: 30px 0;">
        <a href="${process.env.FRONTEND_URL}/orders/${order._id}" 
           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Siparişi Takip Et
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">© 2025 Butiks. Tüm hakları saklıdır.</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject,
    html,
    text: `Sipariş durumu güncellendi: ${statusMessages[status]}`
  });
};

// Password reset email
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const subject = 'Şifre Sıfırlama Talebi';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Şifre Sıfırlama</h2>
      <p>Merhaba ${user.firstName},</p>
      <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
      
      <div style="margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Şifremi Sıfırla
        </a>
      </div>

      <p style="color: #666; font-size: 14px;">Bu link 1 saat geçerlidir.</p>
      <p style="color: #666; font-size: 14px;">Eğer şifre sıfırlama talebinde bulunmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">© 2025 Butiks. Tüm hakları saklıdır.</p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject,
    html,
    text: `Şifrenizi sıfırlamak için bu linke tıklayın: ${resetUrl}`
  });
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendVendorApprovalEmail,
  sendOrderStatusEmail,
  sendPasswordResetEmail
};
