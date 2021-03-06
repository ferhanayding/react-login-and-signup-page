import React from 'react';
import { withTranslation } from 'react-i18next';
 import { changeLanguage } from '../api/apiCalls';

const  LanguageSelector = (props) => {
   
    const onChangeLanguage = language =>{
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    return (
        <div>
        <img src = "http://www.countryflags.io/tr/flat/24.png"
        alt = "Turkish flag" 
        onClick = {() => onChangeLanguage('tr')} 
        style ={{cursor : 'pointer'}}></img>
        
        <img src = "http://www.countryflags.io/us/flat/24.png" 
        alt = "USA flag"
        onClick = {() => onChangeLanguage('en')}
        style ={{cursor : 'pointer'}}></img>

    </div>
    )

}
export default  withTranslation()(LanguageSelector);