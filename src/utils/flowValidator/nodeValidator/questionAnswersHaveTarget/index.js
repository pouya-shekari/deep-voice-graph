const questionAnswersHaveTarget = (node,edges)=>{
    if(node.type === 'Question'){
        if(node.data.label === 'سوال'){
            return [true,'']
        }
        else{
            if(node.data.responses.length === edges.length) return [true,'']
            else return [false,'در گره سوال باید به اندازه تعداد جواب‌ها، خروجی متصل باشد.']
        }
    }
    return [true , '']
}

export default questionAnswersHaveTarget;