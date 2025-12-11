import {
    ChevronLeft,
    Image as ImageIcon,
    MoreVertical,
    Paperclip,
    Search,
    Send,
    User
} from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import VendorBreadcrumb from '../../components/vendor/layout/VendorBreadcrumb';

const VendorMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const conversations = [
    {
      id: 1,
      customer: {
        name: 'Ayşe Yılmaz',
        avatar: null,
        status: 'online',
      },
      lastMessage: 'Ürün ne zaman kargoya verilecek?',
      timestamp: '5 dakika önce',
      unread: 2,
      orderId: 'BT-20250001',
    },
    {
      id: 2,
      customer: {
        name: 'Mehmet Demir',
        avatar: null,
        status: 'offline',
      },
      lastMessage: 'Teşekkür ederim!',
      timestamp: '1 saat önce',
      unread: 0,
      orderId: 'BT-20249999',
    },
    {
      id: 3,
      customer: {
        name: 'Elif Kaya',
        avatar: null,
        status: 'offline',
      },
      lastMessage: 'Ürün bedeni mevcut mu?',
      timestamp: '3 saat önce',
      unread: 1,
      orderId: null,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'customer',
      text: 'Merhaba, sipariş durumu hakkında bilgi alabilir miyim?',
      timestamp: '10:25',
    },
    {
      id: 2,
      sender: 'vendor',
      text: 'Merhaba! Siparişiniz hazırlanıyor. Bugün kargoya verilecek.',
      timestamp: '10:27',
    },
    {
      id: 3,
      sender: 'customer',
      text: 'Harika, teşekkür ederim. Kargo takip numarasını paylaşır mısınız?',
      timestamp: '10:28',
    },
    {
      id: 4,
      sender: 'vendor',
      text: 'Tabii ki! Kargoya verildikten sonra hemen bilgilendireceğim.',
      timestamp: '10:30',
    },
    {
      id: 5,
      sender: 'customer',
      text: 'Ürün ne zaman kargoya verilecek?',
      timestamp: '10:35',
    },
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Breadcrumb */}
      <VendorBreadcrumb items={[{ label: 'Mesajlar' }]} />

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mesajlar</h1>
        <p className="text-gray-600 mt-1">Müşterilerinizle iletişim kurun</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Müşteri ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      {conv.customer.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{conv.customer.name}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">{conv.lastMessage}</p>
                      {conv.orderId && (
                        <span className="text-xs text-blue-600">#{conv.orderId}</span>
                      )}
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-white font-semibold">{conv.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    {selectedConversation.customer.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedConversation.customer.name}</h2>
                    {selectedConversation.orderId && (
                      <p className="text-sm text-gray-600">Sipariş: #{selectedConversation.orderId}</p>
                    )}
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'vendor'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'vendor' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Mesajınızı yazın..."
                      rows={1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Enter ile gönder, Shift+Enter ile yeni satır</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">Sohbet Seçin</p>
                <p className="text-sm text-gray-500 mt-1">Müşteriyle konuşmaya başlamak için bir sohbet seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorMessages;
