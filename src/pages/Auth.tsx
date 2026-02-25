import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    } else {
      if (!displayName.trim()) { setError('İsim gerekli'); setLoading(false); return; }
      if (password.length < 6) { setError('Şifre en az 6 karakter olmalı'); setLoading(false); return; }
      const { error } = await signUp(email, password, displayName.trim());
      if (error) setError(error);
      else setSuccess('Kayıt başarılı! E-postanızı kontrol edin.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">📚 Quiz App</h1>
          <p className="text-muted-foreground">Eğlenerek öğren!</p>
        </div>

        <div className="bg-card rounded-2xl p-8 card-shadow">
          <h2 className="text-xl font-bold text-card-foreground mb-6 text-center">
            {isLogin ? '🔑 Giriş Yap' : '📝 Kayıt Ol'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-1">İsim</label>
                <Input
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Adın (skor tablosunda görünecek)"
                  className="rounded-xl"
                  maxLength={50}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-card-foreground block mb-1">E-posta</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="rounded-xl"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-card-foreground block mb-1">Şifre</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••"
                className="rounded-xl"
                required
                minLength={6}
              />
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/10 rounded-xl p-3">{error}</p>}
            {success && <p className="text-sm text-success bg-success/10 rounded-xl p-3">{success}</p>}

            <Button type="submit" disabled={loading} className="w-full rounded-xl touch-target text-base">
              {loading ? '...' : isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? 'Hesabın yok mu? Kayıt ol' : 'Zaten hesabın var mı? Giriş yap'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
