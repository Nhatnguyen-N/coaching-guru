import { Href } from "expo-router";
import { ImageSourcePropType } from "react-native";

export type PraticeOptionType = {
    name: string,
    image: ImageSourcePropType;
    icon: ImageSourcePropType;
    path: string
}
export const PraticeOption: PraticeOptionType[] = [
    {
        name: 'Quiz',
        image: require('./../assets/images/quizz.png'),
        icon: require('./../assets/images/quiz.png'),
        path: '/quiz'
    },
    {
        name: 'Flashcards',
        image: require('./../assets/images/flashcard.png'),
        icon: require('./../assets/images/layers.png'),
        path: '/flashcards'

    },
    {
        name: 'Question & Ans',
        image: require('./../assets/images/notes.png'),
        icon: require('./../assets/images/qa.png'),
        path: '/questionAnswer'


    }
]
export type BannerImageKey = '/banner1.png' | '/banner2.png' | '/banner3.png' | '/banner4.png' | '/banner5.png';
type ImageAssetsType = Record<BannerImageKey, any>;
export const imageAssets: ImageAssetsType = {
    '/banner1.png': require('./../assets/images/banner1.png'),
    '/banner2.png': require('./../assets/images/banner2.png'),
    '/banner3.png': require('./../assets/images/banner3.png'),
    '/banner4.png': require('./../assets/images/banner4.png'),
    '/banner5.png': require('./../assets/images/banner5.png'),

};

export const CourseCategory = ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"];

export type ProfileMenuType = {
    name: string,
    icon: string,
    path: Href,
};

export const ProfileMenu: ProfileMenuType[] = [
    {
        name: 'Add Course',
        icon: 'add-outline', //Ionic Icons 
        path: '/addCourse'
    },
    {
        name: 'My Course',
        icon: 'book', //Ionic Icons 
        path: '/(tabs)/home'
    },
    {
        name: 'Course Progress',
        icon: 'analytics-outline', //Ionic Icons 
        path: '/(tabs)/progress'
    },
    {
        name: 'My Subscription',
        icon: 'shield-checkmark', //Ionic Icons 
        path: '' as Href
    },
    {
        name: 'Logout',
        icon: 'log-out', //Ionic Icons 
        path: '/auth/signIn'
    }
]