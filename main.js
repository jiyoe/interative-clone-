(() => {

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    //현재활성화된(visible 클래스가 붙은) .graphic-item을 저장
    let currentItem = graphicElems[0];
    let ioIndex;

    //observer
    const io = new IntersectionObserver((enteries, observer) => {
        ioIndex = enteries[0].target.dataset.index * 1;
    });

    for ( let i = 0; i < stepElems.length; i++) {
        //모든 step들이 관찰대상으로 등록됨
        io.observe(stepElems[i]);
        //데이터 인덱스 번호만들어주는 함수
        // stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }
    
    function activate() {
        currentItem.classList.add('visible');
    }

    function inactivate() {
        currentItem.classList.remove('visible');
    }

    window.addEventListener('scroll', () =>{
        let step;
        let boundingRect;

        // for (let i =0; i < stepElems.length; i++ ){
        for(let i = ioIndex -1 ; i < ioIndex +2; i++){
            step = stepElems[i];
            if(!step) continue;
            boundingRect = step.getBoundingClientRect();

            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {

                    inactivate();
                    currentItem = graphicElems[step.dataset.index];
                    activate();
                }
        }
    });

    activate();

})();