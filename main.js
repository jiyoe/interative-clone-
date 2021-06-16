(() => {

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    //현재활성화된(visible 클래스가 붙은) .graphic-item을 저장
    let currentItem;

    for ( let i = 0; i < stepElems.length; i++) {
        //데이터 인덱스 번호만들어주는 함수
        // stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }
    
    window.addEventListener('scroll', () =>{
        let step;
        let boundingRect;

        for (let i =0; i < stepElems.length; i++ ){
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {

                    if(currentItem){
                        currentItem.classList.remove('visible');
                    }
                    currentItem = graphicElems[step.dataset.index];
                    currentItem.classList.add('visible');
                }
        }
    });
})();