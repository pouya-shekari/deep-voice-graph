const targetNotCorrectFromStart = (node, nodeEdges)=>{
    if(node.type === 'Start'){
        let endFlag = false;
        let forwardFlag = false;
        if(nodeEdges.length !==0){
            nodeEdges.forEach(edge=>{
                if(edge.targetNodeType === "End"){
                    endFlag = true
                }
                if(edge.targetNodeType === "Forward"){
                    forwardFlag = true
                }
            })
            if(endFlag){
                return [false,"گره شروع نمی‌تواند به صورت مستقیم به گره پایان متصل شود."]
            }
            if(forwardFlag){
                return [false,"گره شروع نمی‌تواند به صورت مستقیم به گره ارجاع متصل شود."]
            }
        }
    }
    return [true, ""];

}

export default targetNotCorrectFromStart;