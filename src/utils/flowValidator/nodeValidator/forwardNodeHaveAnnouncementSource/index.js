const forwardNodeHaveAnnouncementSource =(node,edges)=>{
    if(node.type === 'Forward'){
        let flag = true;
        edges.forEach(item=>{
            if(item.sourceNodeType !== 'Announcement'){
                flag = false;
            }
        })
        if(flag){
            return [true,''];
        }else{
            return [false,'به گره ارجاع حتما باید گره‌های از نوع اعلان متصل باشد.'];
        }
    }

    return [true,''];
}

export default forwardNodeHaveAnnouncementSource;