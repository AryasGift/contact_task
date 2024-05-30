import axios from "axios"
import { commonRequest } from "./commonStructure";

export class ContactService {
    static serverURL= `https://contact-server-cjxb.onrender.com`
    static getAllContacts(){
        let dataURL=`${this.serverURL}/contacts`
        return axios.get(dataURL)
    }
    static getSingleContact(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL);
    }
    static getGroupName(){
        let dataURL=`${this.serverURL}/groups`
        return axios.get(dataURL)
    }
    static getGroup(contact){
        let groupId=contact.group
        let dataURL=`${this.serverURL}/groups/${groupId}`
        return axios.get(dataURL);

    }
    static createContact(contact){
       let dataURL=`${this.serverURL}/contacts`
       return axios.post(dataURL,contact)
    }
    static updateData(contact,contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.put(dataURL,contact)
    }
    static deleteData(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.delete(dataURL)
    }

}
