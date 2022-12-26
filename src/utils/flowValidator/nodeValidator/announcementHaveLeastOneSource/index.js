const announcementHaveLeastOneSource = (node , edges)=>{
    if(node.type === 'Announcement'){
        let flag = false;
        if(edges.length !==0){
            edges.forEach(edge=>{
                if(node.id === edge.target){
                    flag = true
                }
            })
            return [flag,'به گره اعلان، حداقل باید یک گره به عنوان مبدا متصل باشد.']
        }else{
            return [flag,'به گره اعلان، حداقل باید یک گره به عنوان مبدا متصل باشد.']
        }
    }
    return [true , ""];
}

export default announcementHaveLeastOneSource;