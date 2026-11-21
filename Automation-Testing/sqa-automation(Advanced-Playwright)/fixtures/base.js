import {test as base} from '@playwright/test';
import {InventoryPage} from '../pages/InventoryPage' ;
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegistrationPage';


export const test = base.extend(
    {
        inventoryPage: async ({page},use) =>{
            await use(new InventoryPage(page));
        } ,

        loginPage : async ({page},use) =>{
            await use(new LoginPage(page))
        } ,

    
        registerPage : async ({page} , use) =>{
            await use(new RegisterPage(page)) 
        }

    
    }
)

export {expect} from '@playwright/test'