/*
 * Nadun De Silva - All Rights Reserved
 *
 * This source code and its associated files are the
 * confidential and proprietary information of Nadun De Silva.
 * Unauthorized reproduction, distribution, or disclosure
 * in any form, in whole or in part, is strictly prohibited
 * except as explicitly provided under a separate license
 * agreement with Nadun De Silva.
 *
 * Website: https://nadundesilva.com
 *
 * © 2023 Nadun De Silva. All rights reserved.
 */

export interface Person {
    name: string;
    profile: string;
}

const People: Record<string, Person> = {
    AndrewNg: {
        name: "Andrew Ng",
        profile: "https://en.wikipedia.org/wiki/Andrew_Ng",
    },
    SharonZhou: {
        name: "Sharon Zhou",
        profile: "https://www.coursera.org/instructor/sharon-zhou",
    },
    AdamWhite: {
        name: "Adam White",
        profile: "https://www.coursera.org/instructor/adam-white",
    },
    MarthaWhite: {
        name: "Martha White",
        profile: "https://www.coursera.org/instructor/martha-white",
    },
    TishanDahanayakage: {
        name: "Tishan Dahanayakage",
        profile: "https://www.linkedin.com/in/tishan",
    },
    MalithJayasinghe: {
        name: "Malith Jayasinghe",
        profile: "https://www.linkedin.com/in/malith-jayasinghe",
    },
    IsuruHaththotuwa: {
        name: "Isuru Haththotuwa",
        profile: "https://www.linkedin.com/in/isuruhaththotuwa",
    },
    DuneeshaFernando: {
        name: "Duneesha Fernando",
        profile: "https://www.linkedin.com/in/duneesha-fernando",
    },
    SrinathPerera: {
        name: "Srinath Perera",
        profile: "https://www.linkedin.com/in/srinathperera",
    },
    BinuraGunasekara: {
        name: "Binura Gunasekara",
        profile: "https://www.linkedin.com/in/binura-g",
    },
    KanchanaWickremasinghe: {
        name: "Kanchana Wickremasinghe",
        profile: "https://www.linkedin.com/in/kanchanaw",
    },
    NuwanBandara: {
        name: "Nuwan Bandara",
        profile: "https://www.linkedin.com/in/nuwanbando",
    },
    SinthujaRajendranSuhothayan: {
        name: "Sinthuja Rajendran Suhothayan",
        profile: "https://www.linkedin.com/in/sinthuja-rajendran-b45209122",
    },
};

export default People;
