import conf from "../Conf/conf.js";
import {Client, Account, ID, Databases, Query, Storage} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, image, status, userid}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userid,
                {
                    slug,
                    title,
                    content,
                    image,
                    status,
                    userid
                }
            )
        } catch(err){
            console.log("Appwrite service : Create Service ", err);
        }
    }

    async updatePost(slug, {title, content, image, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )
        } catch(err){
            console.log("Appwrite service : Update Service ", err);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch(err){
            console.log("Appwrite service : Delete Service ", err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch(err){
            console.log("Appwrite Service : getPost Error: ", err);
            return false;
        }
    }async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch(err){
            console.log("Appwrite Service : getPosts Error: ", err);
            return false;
        }
    }

    //File Upload Serivce

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch(err){
            console.log("Appwrite Service : Upload File Error: ", err);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch(err){
            console.log("Appwrite Service : Delete File Error: ", err);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service();
export default service;
