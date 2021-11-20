import { lazy } from 'react';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

const TaskAppConfig = {
	settings: {
		layout: {
			style: 'layout2',
			config: {
				mode: 'boxed',
				scroll: 'content',
				navbar: {
					display: false
				},
				toolbar: {
					display: false,
					position: 'left'
				},
				footer: {
					display: false,
					style: 'fixed'
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		},
		customScrollbars: true,
		theme: {
			main: 'greeny',
			navbar: 'mainThemeDark',
			toolbar: 'mainThemeDark',
			footer: 'mainThemeDark'
		}
	},
	routes: [
		{
			path: '/:courseId?',
			component: lazy(() => import('./todo/Todo'))
		}
	],
	auth: authRoles.onlyGuest
};

export default TaskAppConfig;
