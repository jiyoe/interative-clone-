(() => {

    //
    const actions = {
        birdFlies(key) {
            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

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
    
    //장면이 활성화 될때 실행되는 함수
    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    //비활성화 될때 실행되는 함수 
    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () =>{
        let step;
        let boundingRect;

        // for (let i =0; i < stepElems.length; i++ ){
        for(let i = ioIndex -1 ; i < ioIndex +2; i++){
            step = stepElems[i];
            //step에 값이 없다면,continue
            if(!step) continue;
            boundingRect = step.getBoundingClientRect();

            //화면에 보이는 innerHeight가 0.1 에서 0.8
            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {

                inactivate();
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    activate();

})();