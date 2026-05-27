import pushup from '../assets/pushup.jpg';
import jumpingjack from '../assets/jumpingjack.jpg';
import squat from '../assets/squat.jpg';
import plank from '../assets/plank.jpg';

export const movementData = [
  {
    id: 1,
    title: 'Push Up',
    muscles: 'CHEST, SHOULDERS, TRICEPS',
    imageSrc: pushup,
    kesalahan: [
      'Pinggul terlalu turun atau naik, merusak postur lurus tubuh.',
      'Siku melebar ke luar membentuk huruf T (bisa memicu cedera bahu).',
      'Rentang gerak (Range of Motion) tidak penuh; dada tidak menyentuh lantai.'
    ],
    tips: [
      'Jaga posisi leher netral dengan melihat sedikit ke depan.',
      'Kencangkan core (otot perut) dan glutes selama gerakan berlangsung.',
      'Posisikan siku sekitar 45 derajat dari tubuh saat turun.'
    ]
  },
  {
    id: 2,
    title: 'Jumping Jack',
    muscles: 'FULL BODY, CARDIO',
    imageSrc: jumpingjack,
    kesalahan: [
      'Gerakan lengan tidak penuh',
      'Mendarat dengan benturan keras'
    ],
    tips: [
      'Mendarat dengan lembut di ujung kaki',
      'Rentangkan tangan hingga di atas kepala'
    ]
  },
  {
    id: 3,
    title: 'Bodyweight Squat',
    muscles: 'QUADRICEPS, GLUTES, HAMSTRINGS',
    imageSrc: squat,
    kesalahan: [
      'Lutut melebihi ujung kaki terlalu jauh (posisi salah)',
      'Punggung membungkuk',
      'Tumit terangkat'
    ],
    tips: [
      'Dorong pinggul kebelakang',
      'Dada membusung ke depan',
      'Berat badan di tumit'
    ]
  },
  {
    id: 4,
    title: 'Forearm Plank',
    muscles: 'CORE, SHOULDERS',
    imageSrc: plank,
    kesalahan: [
      'Pinggul naik terlalu tinggi',
      'Pinggul turun menyentuh lantai',
      'Melihat ke depan (leher tegang)'
    ],
    tips: [
      'Pandangan ke arah tangan',
      'Tarik pusar ke dalam',
      'Kencangkan otot glutes'
    ]
  }
];
