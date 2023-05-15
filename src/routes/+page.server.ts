


export const actions ={
    submitMultiForm: async({request})=>{
        const data = await request.json()
        console.log(data);
    }
}