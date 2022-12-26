const endNodeHaveAnnouncementSource =(node,edges)=>{
    if(node.type === 'End'){
        let flag = true;
        edges.forEach(item=>{
            if(item.sourceNodeType !== 'Announcement'){
                flag = false;
            }
        })
        if(flag){
            return [true,''];
        }else{
            return [false,'به گره پایان حتما باید گره‌های از نوع اعلان متصل باشد.'];
        }
    }

    return [true,''];
}

export default endNodeHaveAnnouncementSource;