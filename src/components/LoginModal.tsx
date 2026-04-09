import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { loginUser, registerUser, loginWithGoogle, saveAuth } from '@/api/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string; avatar?: string }) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const data = await loginUser(loginEmail, loginPassword);
      saveAuth(data.token, data.user);
      onLogin(data.user);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await registerUser(registerName, registerEmail, registerPassword);
      saveAuth(data.token, data.user);
      onLogin(data.user);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-dark-100 border border-border rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Everytech" className="w-8 h-8" />
                  <span className="text-xl font-bold text-white">Everytech</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setError(''); }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-dark mb-6">
                  <TabsTrigger value="login" className="data-[state=active]:bg-coral data-[state=active]:text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-coral data-[state=active]:text-white">
                    Create Account
                  </TabsTrigger>
                </TabsList>

                {/* Google Login */}
                <button
                  onClick={loginWithGoogle}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-dark border border-border rounded-lg text-white hover:bg-dark-200 transition-colors mb-4"
                >
                  <Chrome className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium">Continue with Google</span>
                </button>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-dark-100 px-2 text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Login Tab */}
                <TabsContent value="login" className="mt-0">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email" className="text-gray-300">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          className="pl-10 bg-dark border-border text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          className="pl-10 pr-10 bg-dark border-border text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                        <input type="checkbox" className="rounded border-border bg-dark" />
                        Remember me
                      </label>
                      <a href="/forgot-password" className="text-coral hover:underline">
                        Forgot password?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-coral hover:bg-coral-dark text-white"
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="mt-0">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="register-name" className="text-gray-300">Full Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="John Doe"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          required
                          className="pl-10 bg-dark border-border text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-email" className="text-gray-300">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                          className="pl-10 bg-dark border-border text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-password" className="text-gray-300">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                          className="pl-10 pr-10 bg-dark border-border text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="register-confirm" className="text-gray-300">Confirm Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="register-confirm"
                          type="password"
                          placeholder="••••••••"
                          value={registerConfirmPassword}
                          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                          required
                          className="pl-10 bg-dark border-border text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      <input type="checkbox" required className="mt-1 rounded border-border bg-dark" />
                      <span className="text-gray-400">
                        I agree to the{' '}
                        <a href="/terms" className="text-coral hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-coral hover:underline">Privacy Policy</a>
                      </span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-coral hover:bg-coral-dark text-white"
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}