import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'SYMORA Posture Corrector Pro',
    price: 29.99,
    images: [
      '/posture crrector.PNG',
      'https://images.pexels.com/photos/6975473/pexels-photo-6975473.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7203688/pexels-photo-7203688.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6740821/pexels-photo-6740821.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Revolutionary X-strap posture corrector designed to naturally align your spine and improve your daily posture habits with maximum comfort.',
    benefits: [
      'Immediate posture improvement',
      'Reduces back and neck pain',
      'Comfortable all-day wear',
      'Adjustable fit for all body types',
      'Breathable premium materials',
      'Invisible under clothing'
    ],
    category: 'posture'
  },
  {
    id: '2',
    name: 'SYMORA Neck Stretcher Elite',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/6975420/pexels-photo-6975420.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6975419/pexels-photo-6975419.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7203680/pexels-photo-7203680.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Advanced cervical traction device that provides gentle, effective neck pain relief and improved mobility for modern professionals.',
    benefits: [
      'Relieves cervical tension',
      'Improves neck flexibility',
      'Professional-grade design',
      'Portable and lightweight',
      'Easy 10-minute sessions',
      'Clinically tested results'
    ],
    category: 'recovery'
  },
  {
    id: '3',
    name: 'SYMORA Recovery Massage Tool',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/7203681/pexels-photo-7203681.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6740822/pexels-photo-6740822.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7203686/pexels-photo-7203686.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Precision-engineered massage tool for deep tissue therapy and muscle recovery optimization with ergonomic design.',
    benefits: [
      'Deep muscle relief',
      'Accelerated recovery',
      'Ergonomic grip design',
      'Multiple pressure points',
      'Durable construction',
      'Travel-friendly size'
    ],
    category: 'massage'
  },
  {
    id: '4',
    name: 'SYMORA Alignment Support',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/6975475/pexels-photo-6975475.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7203687/pexels-photo-7203687.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6740823/pexels-photo-6740823.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Complete spinal alignment system for comprehensive postural support and wellness enhancement throughout your day.',
    benefits: [
      'Full spinal support',
      'Enhanced wellness',
      'Premium materials',
      'All-day comfort',
      'Discreet design',
      'Scientifically proven'
    ],
    category: 'alignment'
  }
];