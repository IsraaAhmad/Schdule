import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

export const baseURL = 'https://localhost:3443';

//RTL support for Mui
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const RTL = (props) => (
	<StylesProvider jss={jss}>{props.children}</StylesProvider>
);

//Mui override
export const theme = createTheme({
	direction: 'rtl',
	palette: {
		primary: {
			light: '#1995d3',
			main: '#1976d3',
			dark: '#1957d3',
			contrastText: '#fff',
            fontFamily: 'Roboto',
            fontSize: "66px !important",
            fontWeight:"fontWeightBold"
		},
		secondary: {
			light: '#ccc',
			main: '#37474f',
			dark: '#666',
			contrastText: '#000',
            fontFamily: 'Roboto',
            fontSize: "66px !important",
            fontWeight:"fontWeightBold"
		}
	},
	overrides: {
		MuiInput: {
			underline: {
				'&:hover:not($disabled):before': {
					borderBottom: '1px solid rgba(0, 0, 0, 0.87);'
				}
			}
		}
	},
	typography: {
		fontFamily: "Droid Arabic Kufi', serif"
	}
});