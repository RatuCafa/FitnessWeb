import jumpingjack from '../assets/jumpingjack.jpg';
import squat from '../assets/squat.jpg';
import plank from '../assets/plank.jpg';
import pushup from '../assets/pushup.jpg';

export const workoutPrograms = {
  'fat-loss': {
    title: 'Fat Burner HIIT',
    duration: '15 MENIT • 3 GERAKAN',
    exercises: [
      { name: 'Jumping Jack', detail: '45 detik', time: 45, img: jumpingjack },
      { name: 'Bodyweight Squat', detail: '15 repetisi', time: 60, img: squat },
      { name: 'Forearm Plank', detail: '30 detik', time: 30, img: plank }
    ]
  },
  'general-health': {
    title: 'Daily Mobility & Core',
    duration: '10 MENIT • 3 GERAKAN',
    exercises: [
      { name: 'Forearm Plank', detail: '45 detik', time: 45, img: plank },
      { name: 'Bodyweight Squat', detail: '10 repetisi', time: 60, img: squat },
      { name: 'Push Up', detail: '5-8 repetisi', time: 60, img: pushup }
    ]
  },
  'muscle-gain': {
    title: 'Muscle Gain',
    duration: '10 MENIT • 3 GERAKAN',
    exercises: [
      { name: 'Forearm Plank', detail: '45 detik', time: 45, img: plank },
      { name: 'Bodyweight Squat', detail: '24 repetisi', time: 60, img: squat },
      { name: 'Push Up', detail: '8 - 12 repetisi', time: 60, img: pushup }
    ]
  }
};
