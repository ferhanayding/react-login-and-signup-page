import React from 'react';
import { signup } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next'
class UserSignUpPage extends React.Component{

    state  = {
        username : null,
        displayname : null,
        password : null,
        passwordrepeat : null,
        pendingApiCall : false,
        // buton suanda false yani engelli degil
        errors : {}
        // baslangıc olarak bir hata vermiyoruz ki cevabı aldıgımız ana kalsın 
        // şimdi backkendeki validationerror mesajını alıp bootstrap yardımıyla ekrana yazdırıcaz
        // bunun icin olk olarak catch in icinde yukarda tanımladıgımız errors u set edip 
        // icine error.response.data.validationerror yazip o mesajı cekıcez 
    }
    onChange = event =>{

        const {t} = this.props;
        const {name,value} = event.target;
        const errors = {...this.state.errors}
        errors[name] = undefined;
        if(name === 'password' || name === 'passwordRepeat'){
            
            if(name === 'password' && value !== this.state.passwordRepeat){
                
                errors.passwordRepeat = t('password mismatch')

            }else if(name === 'passwordRepeat' && value !== this.state.password){

                errors.passwordRepeat = t('password mismatch')
            
            }else{
                errors.passwordRepeat = undefined;
            }

        }
        this.setState({
            [name] : value,
            errors
        })
     }
    onClickSignUp = async event =>{
        event.preventDefault();
       
        const {username,displayname,password} = this.state;
        const body ={
            username,
             displayname,
            password 
        }   
        this.setState({pendingApiCall : true})

        try{
            const response = await signup(body);
        } catch(error){
            if(error.response.data.validationErrors){
                this.setState({errors : error.response.data.validationErrors});
            }
           
            // diyerek axiosun bi ozelligi olarak backkendde tanımladıgımız
            // validation message veya pathini alabiliyoruz
        }
        this.setState({pendingApiCall : false })
        
        
        // .then(response =>{
        //     this.setState({pendingApiCall : false})
            
            // axiosla gonderildigi zaman pendingapicall false olsun gonderilemesse yani nullsa veya
            // hatalı girisse 28 . satırda yazdıgımız uzere true yani engelli disable olsun 
        // })
        // .catch(error => {
        //     this.setState({pendingApiCall : false})
        // })
    }
    
    render(){
        const {pendingApiCall,errors} = this.state;
        // burdaki olay errors,pendingapicall yazınca this.state yanında gelıyo 
        const {username,displayname,password,passwordRepeat} = errors;  
        // username yazzınca yukarda tanımladıgımız errors = this.state gelıyo ve this.state.errors.username ortaya cıkıyo
       const { t } = this.props;
        return (
           
           <div className = "container">
                <form>
             <h1 className = "text-center">{t('Sign Up')}</h1>
            
            <Input name ="username" label = {t("Username")} error = {username} onChange = {this.onChange}/>
             
            <Input name ="displayname" label = {t("Display Name")} error = {displayname} onChange = {this.onChange}/>
           
             <Input name ="password" label = {t("Password")} error = {password} onChange = {this.onChange} type = "password"/>

             <Input name = "passwordRepeat" label = {t("Password Repeat")} error = {passwordRepeat} onChange ={this.onChange} type ="password"/>
    
            <div className = "text-center mt-3">
            <button 
            className = "btn btn-primary" 
            onClick = {this.onClickSignUp}
             disabled = {pendingApiCall || passwordRepeat !== undefined}>
                  {pendingApiCall && <span className ="spinner-border spinner-border-sm"></span>} {t('Sign Up')}</button>
            </div>
           
            </form>
           </div>
            
        )
    }
}
const UserSignUpPageWithTranslation  = withTranslation()(UserSignUpPage);
export default UserSignUpPageWithTranslation;