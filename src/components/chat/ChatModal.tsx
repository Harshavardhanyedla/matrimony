import React, { useState } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Smile, 
  CheckCheck, 
  Video, 
  Phone, 
  X, 
  Search,
  MoreVertical,
  Paperclip
} from 'lucide-react';
import { UserProfile, ChatMessage } from '../../types';

interface ChatModalProps {
  currentUser: UserProfile;
  contacts: UserProfile[];
  messages: Record<string, ChatMessage[]>;
  activeContact: UserProfile | null;
  onSelectContact: (contact: UserProfile) => void;
  onSendMessage: (contactId: string, text: string) => void;
  onStartVideoCall: (contact: UserProfile) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  currentUser,
  contacts,
  messages,
  activeContact,
  onSelectContact,
  onSendMessage,
  onStartVideoCall
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const selectedContact = activeContact || contacts[0];
  const activeMessages = selectedContact ? messages[selectedContact.id] || [] : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedContact) return;
    
    onSendMessage(selectedContact.id, inputText.trim());
    setInputText('');

    // Simulate typing response from partner after 1.5 seconds!
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2500);
  };

  const sampleEmojis = ['😊', '❤️', '🌹', '✨', '🙏', '😍', '💍', '🎉', '🥂'];

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[75vh]">
        
        {/* Contact List Sidebar */}
        <div className="border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-black text-slate-900 dark:text-white">SoulMatch Messages</h3>
            <div className="relative mt-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs bg-white dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
            {contacts.map((contact) => {
              const lastMsg = (messages[contact.id] || []).slice(-1)[0];
              const isSelected = selectedContact?.id === contact.id;

              return (
                <button
                  key={contact.id}
                  onClick={() => onSelectContact(contact)}
                  className={`w-full p-4 flex items-center gap-3 text-left transition-colors ${
                    isSelected ? 'bg-rose-50 dark:bg-rose-950/40 border-l-4 border-[#C2185B]' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.photos[0]}
                      alt={contact.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    {contact.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{contact.name}</h4>
                      <span className="text-[10px] text-slate-400">{lastMsg ? lastMsg.timestamp : ''}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : 'Tap to start conversation'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Chat Conversation Area */}
        {selectedContact ? (
          <div className="md:col-span-2 flex flex-col h-full bg-slate-50/30 dark:bg-slate-950/30">
            
            {/* Header */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedContact.photos[0]}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedContact.name}</h4>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    {selectedContact.isOnline ? 'Online Now • Verified Profile' : `Last active ${selectedContact.lastActive}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartVideoCall(selectedContact)}
                  className="p-2 rounded-full bg-rose-50 dark:bg-rose-950 text-[#C2185B] hover:bg-rose-100"
                  title="Start HD Video Call"
                >
                  <Video className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs shadow-xs space-y-1 ${
                        isMe
                          ? 'bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 text-[9px] opacity-75">
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-cyan-300" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-2xl text-xs text-slate-500 flex items-center gap-1.5 animate-pulse">
                    <span>{selectedContact.name.split(' ')[0]} is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Emoji Quick Picker */}
            {showEmojiPicker && (
              <div className="p-2 bg-white dark:bg-slate-900 border-t border-slate-200 flex gap-2 overflow-x-auto">
                {sampleEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setInputText((prev) => prev + emoji)}
                    className="text-lg hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-2 text-slate-400 hover:text-[#C2185B]"
              >
                <Smile className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 py-2 px-4 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none"
              />

              <button
                type="submit"
                className="p-2.5 rounded-full bg-gradient-to-r from-[#C2185B] to-[#6A1B9A] text-white font-bold shadow-md hover:opacity-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center p-8 text-center text-slate-400">
            Select a conversation to view chat
          </div>
        )}

      </div>
    </div>
  );
};
