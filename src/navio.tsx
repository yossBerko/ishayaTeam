import {Navio} from 'rn-navio';

import {Messages} from '@app/screens/main';
import {tasks} from '@app/screens/tasks';
import {TimeClock} from '@app/screens/TimeClock';
import {Setting} from "@app/screens/Setting";

import {useAppearance} from '@app/utils/hooks';
import {
    screenDefaultOptions,
    tabScreenDefaultOptions,
    getTabBarIcon,
    drawerScreenDefaultOptions,
} from '@app/utils/designSystem';
import {services} from '@app/services';
import {AuthLogin} from './screens/auth/login';
import {StackScreenOptions, TTabsContentValue} from "rn-navio/dist/types";
import {task} from "@app/screens/tasks/Task";
import {CameraScreen} from "@app/screens/CameraScreen";


const isAdmin: boolean = false;

const createTabsContent = (isAdmin: boolean): any => {
    let tabsContent: any = {
        NotifyTab: {
            stack: 'notificationStack',
            options: () => ({
                title: 'הודעות',
                tabBarIcon: getTabBarIcon('NotifyTab'),
            }),
        },
        TasksTab: {
            stack: 'tasksStack',
            options: () => ({
                title: 'משימות',
                tabBarIcon: getTabBarIcon('TasksTab'),
            }),
        },
        ClockTab: {
            stack: 'timeClockStack',
            options: () => ({
                title: 'שעון נוכחות',
                tabBarIcon: getTabBarIcon('ClockTab'),
            }),
        },
    };

    if (isAdmin) {
        tabsContent.AdminTab = {
            stack: 'adminStack',
            options: () => ({
                title: 'ניהול',
                tabBarIcon: getTabBarIcon('AdminTab'),
            }),
        };
    }

    return tabsContent;
};

// NAVIO
export const navio = Navio.build({
    screens: {
        Messages,

        TimeClock,

        tasks,
        task,

        CameraScreen,

        // for auth flow
        AuthLogin,
        Setting,
        // for .pushStack example
/*        ProductPage: {
            component: Example,
            options: {
                headerShown: false,
            },
        },*/
    },
    stacks: {
        notificationStack: {
            screens: ['Messages'],
        },
        tasksStack: ['tasks','task','CameraScreen'],
        timeClockStack: {
            screens: ['TimeClock'],
            containerOptions: {
                headerShown: false,
                title: 'שעון נוכחות',
            },
        },
        menuStack:{
            screens: ['Setting','Messages','tasks','TimeClock'],
        },
        // for auth flow
        AuthFlow: ['AuthLogin'],
        /*        ExampleStack: {
            screens: ['TimeClock'],
            navigatorProps: {
                screenListeners: {
                    focus: () => {
                    },
                },
            },
        },*/
    },
    tabs: {
        // main 3 tabs
        AppTabs: {
            content: createTabsContent(isAdmin),
        },
        /*
        ClockTab: {
                  stack: ['Settings'],
                  options: () => ({
                    title: services.t.do('settings.title'),
                    tabBarIcon: getTabBarIcon('ClockTab'),
                    tabBarBadge: 23,
                  }),
                },
         */
        // tabs with drawer
        // TabsWithDrawer: {
        //   content: {
        //     MainTab: {
        //       stack: 'MainStack',
        //       options: () => ({
        //         title: 'Main',
        //         tabBarIcon: getTabBarIcon('MainTab'),
        //       }),
        //     },
        //     PlaygroundTab: {
        //       drawer: 'DrawerForTabs',
        //       options: () => ({
        //         title: 'Playground',
        //         tabBarIcon: getTabBarIcon('PlaygroundTab'),
        //       }),
        //     },
        //   },
        // },
    },
    drawers: {
        // main drawer
        MainDrawer: {
            content: {
                Setting: {
                    stack: 'menuStack',
                },
            },
            navigatorProps: {
                drawerType: 'slide',
            },
            drawerPosition: 'left',
        },

        // drawer inside tabs
        // DrawerForTabs: {
        //   content: {
        //     FlashList: {
        //       stack: ['PlaygroundFlashList'],
        //       options: {
        //         title: 'Flash List',
        //         drawerPosition: 'right',
        //       },
        //     },
        //     ExpoImage: {
        //       stack: ['PlaygroundExpoImage'],
        //       options: {
        //         title: 'Expo Image',
        //         drawerPosition: 'right',
        //       },
        //     },
        //   },
        // },
    },
/*    modals: {
        ExampleModal: 'ExampleStack',
    },*/
    root: 'AppTabs',
    hooks: [useAppearance],
    defaultOptions: {
        stacks: {
            screen: screenDefaultOptions,
        },
        tabs: {
            screen: tabScreenDefaultOptions,
        },
        drawers: {
            screen: drawerScreenDefaultOptions,
        },
    },
});


export const getNavio = () => navio;
export const NavioApp = navio.App;
