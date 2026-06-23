import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

export default function StatCard({ icon: Icon, value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#FFD700]/30 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#B30000] rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-black" />
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          <div className="text-gray-400 text-sm">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}
