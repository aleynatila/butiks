import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import VendorHeader from '../../components/vendor/layout/VendorHeader';
import VendorSidebar from '../../components/vendor/layout/VendorSidebar';

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Header */}
        <VendorHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
