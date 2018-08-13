import React from 'react';
import classnames from 'classnames';
import EventListener from 'fbjs/lib/EventListener';
import CSSCore from 'fbjs/lib/CSSCore';
import lodashThrottle from 'lodash/throttle';
import domHelperOffset from 'dom-helpers/query/offset';
import domHelperWidth from 'dom-helpers/query/width';
import domHelperHeight from 'dom-helpers/query/height';
import domHelperScrollTop from 'dom-helpers/query/scrollTop';
import domHelperQuerySelectorAll from 'dom-helpers/query/querySelectorAll';
import domHelperStyle from 'dom-helpers/style';
import requestAnimationFrame from 'dom-helpers/util/requestAnimationFrame';

// 스크롤 움직이는 크기 0~1 사이. 1 = 사진 움직임 없음. 0 = 스크롤과 일치하게 사진 움직임.
const SCROLLING_FACTOR = 1;

// 참고 소스 코드
// https://github.com/foleyatwork/rafscroll/blob/master/src/rafscroll.js

class NLParallaxBackgrounds extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    images: React.PropTypes.arrayOf(React.PropTypes.shape({
      image: React.PropTypes.node,
      targetClass: React.PropTypes.string,
      width: React.PropTypes.number,
      height: React.PropTypes.number
    }))
  };

  render() {
    return (
      <div className={classnames('NLParallaxBackgrounds', this.props.className)}>
      {
        this.props.images.map(({ image }, idx) => (
          <div 
            key={idx}
            className={classnames('NLParallaxBackgrounds-imageWrapper')}
            ref={`NLParallaxBackgroundsNode-imageWrapper-${idx}`}>
            <img
              className="NLParallaxBackgrounds-image"
              src={image}
              alt="NavyLab"
              ref={`NLParallaxBackgroundsNode-image-${idx}`}
              onLoad={this._onLoadImage.bind(this, idx)}
            />
          </div>
        ))
      }
      </div>
    );
  }

  componentDidMount() {
    this._scrolling = false;

    // 두번째부터 마지막 사진들 미리 다운 받아놓아서 스크롤시 사진 준비 돼있게 하기.
    this.props.images.forEach(({ image }, idx) => {
      if (idx > 0) {
        (new Image()).src = image;
      }
    });

    this.props.images.forEach((imageItem, idx) => {
      imageItem.targetNode = domHelperQuerySelectorAll(document, imageItem.targetClass)[0];
    });

    this._attachScrollListener();
  }

  componentWillUnmount() {
    this._detachScrollListener();
  }

  _onLoadImage = (idx) => {
    CSSCore.addClass(this.refs[`NLParallaxBackgroundsNode-image-${idx}`], 'loaded');
  };

  _attachScrollListener = () => {
    this._scrollListener = EventListener.listen(window, 'scroll', this._onScrollOrResize);
    this._resizeListener = EventListener.listen(window, 'resize', lodashThrottle(this._onScrollOrResize, 50));

    this._onScrollOrResize();
  };

  _detachScrollListener = () => {
    if (this._scrollListener) {
      this._scrollListener.remove();
      this._scrollListener = null;
    }
    if (this._resizeListener) {
      this._resizeListener.remove();
      this._resizeListener = null;
    }
  };

  _onScrollOrResize = () => {
    if (!this._scrolling) {
      this._scrolling = true;
      this._updateStyles();
    }

    if (this._scrollTimeout) {
      clearTimeout(this._scrollTimeout);
      this._scrollTimeout = null;
    }

    this._scrollTimeout = setTimeout(() => {
      this._scrolling = false;
    }, 100);
  };

  _updateStyles = () => {
    const scrollTop = domHelperScrollTop(window);
    const windowWidth = domHelperWidth(window);
    const windowHeight = domHelperHeight(window);

    this.props.images.forEach(({ targetNode, width: originalWidth, height: originalHeight }, idx) => {
      const imageWrapperNode = this.refs[`NLParallaxBackgroundsNode-imageWrapper-${idx}`];
      const { 
        top: targetTop,
        height: targetHeight
      } = domHelperOffset(targetNode);
      
      if (scrollTop >= targetTop - domHelperHeight(window) && 
          scrollTop <= targetTop + targetHeight) {
        const wrapperY = targetTop - scrollTop;
        const targetRatio = windowWidth / targetHeight;
        const imageRatio = originalWidth / originalHeight
        const windowRatio = windowWidth / windowHeight;
        const imageStyle = {};

        domHelperStyle(imageWrapperNode, {
          '-webkit-transform': `translate3d(0px, ${wrapperY}px, 0px)`,
          '-moz-transform': `translate3d(0px, ${wrapperY}px, 0px)`,
          '-ms-transform': `translate3d(0px, ${wrapperY}px, 0px)`,
          '-o-transform': `translate3d(0px, ${wrapperY}px, 0px)`,
          'transform': `translate3d(0px, ${wrapperY}px, 0px)`,
          'height': `${targetHeight}px`
        });

        if (targetRatio > windowRatio) {
          if (windowRatio < imageRatio) {
            // 브라우저 높이 채우기.
            const newWidth = Math.round(windowHeight * imageRatio);
            imageStyle.top = 0;
            imageStyle.left = Math.round((newWidth - windowWidth) / -2);
            imageStyle.width = newWidth;
            imageStyle.height = windowHeight;
          } else {
            // 브라우저 넓이 채우기.
            const newHeight = Math.round(windowWidth / imageRatio);
            imageStyle.top = Math.round((newHeight - windowHeight) / -2);
            imageStyle.left = 0;
            imageStyle.width = windowWidth;
            imageStyle.height = newHeight;
          }
        } else if (targetRatio < imageRatio) {
          // 섹션 높이 채우기.
          const newWidth = Math.round(targetHeight * imageRatio);
          imageStyle.top = 0;
          imageStyle.left = Math.round((newWidth - windowWidth) / -2);
          imageStyle.width = newWidth
          imageStyle.height = targetHeight; 
        } else {
          // 섹션 넓이 채우기.
          const newHeight = Math.round(windowWidth / imageRatio);
          imageStyle.top = Math.round((newHeight - targetHeight) / -2);
          imageStyle.left = 0;
          imageStyle.width = windowWidth;
          imageStyle.height = newHeight;
        }

        const imageY = Math.round(-1 * wrapperY * SCROLLING_FACTOR);
        const imageNode = this.refs[`NLParallaxBackgroundsNode-image-${idx}`];

        domHelperStyle(imageNode, {
          '-webkit-transform': `translatey(${imageY}px) translatez(0)`,
          '-moz-transform': `translatey(${imageY}px) translatez(0)`,
          '-ms-transform': `translatey(${imageY}px) translatez(0)`,
          '-o-transform': `translatey(${imageY}px) translatez(0)`,
          'transform': `translatey(${imageY}px) translatez(0)`,
          top: `${imageStyle.top}px`,
          left: `${imageStyle.left}px`,
          width: `${imageStyle.width}px`,
          height: `${imageStyle.height}px`,
        });
      } else {
        domHelperStyle(imageWrapperNode, {
          '-webkit-transform': `translate3d(0px, -100%, 0px)`,
          '-moz-transform': `translate3d(0px, -100%, 0px)`,
          '-ms-transform': `translate3d(0px, -100%, 0px)`,
          '-o-transform': `translate3d(0px, -100%, 0px)`,
          'transform': `translate3d(0px, -100%, 0px)`
        });
      }
    });

    if (this._scrolling) {
      requestAnimationFrame(this._updateStyles);
    }
  };

}

export default NLParallaxBackgrounds;
