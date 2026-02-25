import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

interface Profile { user_id: string; display_name: string; }
interface Message { id: string; sender_id: string; receiver_id: string; content: string; created_at: string; read: boolean; }

export default function Messages() {
  const { user } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [searchName, setSearchName] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser || !user) return;
    loadMessages();

    const channel = supabase
      .channel('messages-rt')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const msg = payload.new as Message;
        if ((msg.sender_id === user.id && msg.receiver_id === selectedUser.user_id) ||
            (msg.sender_id === selectedUser.user_id && msg.receiver_id === user.id)) {
          setMessages(prev => [...prev, msg]);
          setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [selectedUser, user]);

  const loadUsers = async () => {
    const { data } = await supabase.from('profiles').select('user_id, display_name');
    setUsers((data || []).filter(u => u.user_id !== user?.id));
  };

  const loadMessages = async () => {
    if (!selectedUser || !user) return;
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedUser.user_id}),and(sender_id.eq.${selectedUser.user_id},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true });
    setMessages(data || []);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selectedUser || !user) return;
    const content = newMsg.trim().slice(0, 500);
    await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: selectedUser.user_id,
      content,
    });
    setNewMsg('');
  };

  const filteredUsers = searchName
    ? users.filter(u => u.display_name.toLowerCase().includes(searchName.toLowerCase()))
    : users;

  if (selectedUser) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-20">
        {/* Chat header */}
        <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSelectedUser(null)} className="text-lg touch-target">←</button>
          <h2 className="font-bold text-card-foreground">{selectedUser.display_name}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">Henüz mesaj yok. İlk mesajı gönder!</p>
          )}
          {messages.map(m => {
            const isMe = m.sender_id === user?.id;
            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  isMe ? 'bg-primary text-primary-foreground' : 'bg-card card-shadow text-card-foreground'
                }`}>
                  <p className="text-sm">{m.content}</p>
                  <p className={`text-[10px] mt-1 ${isMe ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    {new Date(m.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bg-card border-t border-border p-3 flex gap-2">
          <Input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Mesaj yaz..."
            className="rounded-xl"
            maxLength={500}
          />
          <Button onClick={sendMessage} className="rounded-xl touch-target" disabled={!newMsg.trim()}>
            Gönder
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">💬 Mesajlar</h1>

        <Input
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          placeholder="İsim ara..."
          className="rounded-xl mb-4"
        />

        {filteredUsers.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 card-shadow text-center">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-muted-foreground">
              {searchName ? 'Kullanıcı bulunamadı.' : 'Henüz kayıtlı kullanıcı yok.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUsers.map(u => (
              <button
                key={u.user_id}
                onClick={() => setSelectedUser(u)}
                className="w-full bg-card rounded-2xl p-4 card-shadow hover:card-shadow-hover transition-all text-left flex items-center gap-3 touch-target"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                  {u.display_name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-card-foreground">{u.display_name}</span>
                <span className="ml-auto text-muted-foreground">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
