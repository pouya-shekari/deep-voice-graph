const IsFlowValid = (nodes, edges) => {
  let checkLoop = checkLoopForNode(nodes,edges)
  let isValid = checkLoop[0];
  let errors = [];
  errors.push(checkLoop[1]);
  return [isValid, errors];
};
export default IsFlowValid;

const checkLoopForNode = (nodes,edges)=>{
  let flag = true;
  nodes.forEach(node=>{
    let currentNodeEdges = edges.filter((edg) => edg.source === node.id)
    if(currentNodeEdges.length !==0){
      currentNodeEdges.forEach(edge=>{
        if(edge.target === node.id){
          flag = false;
        }
      })
    }

  })
  if(flag){
    return [true , null]
  }
  else{
    return [false , 'ورودی و خروجی یک گره، نمی‌تواند یکسان باشد.']
  }
}
