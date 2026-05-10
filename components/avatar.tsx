'use client';

export function Avatar({ name, size = 48 }: { name: string, size?: number }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getRandomGradient = (name: string) => {
    const gradients = [
      'from-gold-400 to-gold-600',
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-red-400 to-red-600',
      'from-orange-400 to-orange-600',
    ];
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  return (
    <div 
      style={{ width: size, height: size }}
      className={`rounded-full bg-gradient-to-br ${getRandomGradient(name)} flex items-center justify-center text-brand-black font-bold text-lg shadow-lg shrink-0 border border-white/10`}
    >
      {getInitials(name)}
    </div>
  );
}
