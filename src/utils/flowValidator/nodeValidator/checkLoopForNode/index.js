const checkLoopForNode = (node,edges)=>{
    if(edges.length !==0){
        let flag = true;
        edges.forEach(edge=>{
            if(edge.target === node.id){
                flag = false;
            }
        })
        if(flag) return [true , '']
        else return [false , 'ورودی و خروجی یک گره، نمی‌تواند یکسان باشد']
    }
    return [true , '']
}

export default checkLoopForNode;