import { MessageCircle, Search, Send } from 'lucide-react';
import { useState } from 'react';

const MessagesPage = () => {
  const [conversations] = useState([
    {
      id: 1,
      vendorName: 'Vintage Style Shop',
      vendorAvatar: 'https://ui-avatars.com/api/?name=Vintage+Style+Shop&background=6366f1&color=fff',
      lastMessage: 'Ürününüz bugün kargoya verildi',
      lastMessageDate: '2024-12-05T14:30:00',
      unreadCount: 2,
      messages: [
        { id: 1, sender: 'vendor', text: 'Merhaba! Siparişiniz için teşekkürler.', time: '2024-12-04T10:00:00' },
        { id: 2, sender: 'user', text: 'Merhaba, ürün ne zaman kargoya verilecek?', time: '2024-12-05T09:15:00' },
        { id: 3, sender: 'vendor', text: 'Ürününüz bugün kargoya verildi', time: '2024-12-05T14:30:00' }
      ]
    },
    {
      id: 2,
      vendorName: 'Streetwear Collective',
      vendorAvatar: 'https://ui-avatars.com/api/?name=Streetwear+Collective&background=8b5cf6&color=fff',
      lastMessage: 'Bedeniniz stoklarımızda var',
      lastMessageDate: '2024-12-03T16:45:00',
      unreadCount: 0,
      messages: [
        { id: 1, sender: 'user', text: 'L bedeni var mı?', time: '2024-12-03T15:00:00' },
        { id: 2, sender: 'vendor', text: 'Bedeniniz stoklarımızda var', time: '2024-12-03T16:45:00' }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to the server
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Satıcı Mesajlarım</h1>
          <p className="text-gray-600 mt-2">Satıcılarla iletişim kurun</p>
        </div>

        {/* Messages Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className="border-r border-gray-200 overflow-y-auto">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Satıcı ara..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Conversation Items */}
              <div>
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${
                      selectedConversation?.id === conv.id ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={conv.vendorAvatar}
                        alt={conv.vendorName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">{conv.vendorName}</h4>
                          {conv.unreadCount > 0 && (
                            <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(conv.lastMessageDate).toLocaleDateString('tr-TR', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            {selectedConversation ? (
              <div className="md:col-span-2 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedConversation.vendorAvatar}
                      alt={selectedConversation.vendorName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.vendorName}</h3>
                      <p className="text-xs text-gray-500">Aktif</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                          }`}
                        >
                          {new Date(message.time).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Mesajınızı yazın..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Gönder</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="md:col-span-2 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Bir konuşma seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {conversations.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz Mesajınız Yok</h3>
            <p className="text-gray-600">Satıcılarla iletişime geçtiğinizde mesajlar burada görünecek</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
