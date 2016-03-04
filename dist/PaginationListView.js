'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _PageView = require('./PageView');

var _PageView2 = _interopRequireDefault(_PageView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationListView = function (_Component) {
  _inherits(PaginationListView, _Component);

  function PaginationListView() {
    _classCallCheck(this, PaginationListView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PaginationListView).call(this));

    _this.checkMobileWidth = function () {
      if (window.innerWidth > _this.props.mobileBreakpoint) {
        _this.setState({ isMobile: false });
      } else {
        _this.setState({ isMobile: true });
      }
    };

    _this.renderMobileListView = function (items) {
      return _react2.default.createElement(
        'ul',
        { className: _this.props.subContainerClassName },
        _react2.default.createElement(
          'li',
          { className: _this.props.mobilePageClassName },
          _this.props.mobilePageLabel,
          ' ',
          _this.props.selected + 1,
          ' ',
          _this.props.mobileOfLabel,
          ' ',
          _this.props.pageNum
        )
      );
    };

    _this.renderDesktopListView = function (items) {
      return _react2.default.createElement(
        'ul',
        { className: _this.props.subContainerClassName },
        (0, _reactAddonsCreateFragment2.default)(items)
      );
    };

    _this.state = {
      isMobile: true
    };
    return _this;
  }

  _createClass(PaginationListView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.checkMobileWidth();

      window.addEventListener('resize', function () {
        _this2.checkMobileWidth();
      }, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var items = {};

      if (this.props.pageNum <= this.props.pageRangeDisplayed) {

        for (var index = 0; index < this.props.pageNum; index++) {
          items['key' + index] = _react2.default.createElement(_PageView2.default, {
            onClick: this.props.onPageSelected.bind(null, index),
            selected: this.props.selected === index,
            pageClassName: this.props.pageClassName,
            pageLinkClassName: this.props.pageLinkClassName,
            activeClassName: this.props.activeClassName,
            page: index + 1 });
        }
      } else {

        var leftSide = this.props.pageRangeDisplayed / 2;
        var rightSide = this.props.pageRangeDisplayed - leftSide;

        if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
          rightSide = this.props.pageNum - this.props.selected;
          leftSide = this.props.pageRangeDisplayed - rightSide;
        } else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
          leftSide = this.props.selected;
          rightSide = this.props.pageRangeDisplayed - leftSide;
        }

        var index = undefined;
        var page = undefined;

        for (index = 0; index < this.props.pageNum; index++) {

          page = index + 1;

          var pageView = _react2.default.createElement(_PageView2.default, {
            onClick: this.props.onPageSelected.bind(null, index),
            selected: this.props.selected === index,
            pageClassName: this.props.pageClassName,
            pageLinkClassName: this.props.pageLinkClassName,
            activeClassName: this.props.activeClassName,
            page: index + 1 });

          if (page <= this.props.marginPagesDisplayed) {
            items['key' + index] = pageView;
            continue;
          }

          if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
            items['key' + index] = pageView;
            continue;
          }

          if (index >= this.props.selected - leftSide && index <= this.props.selected + rightSide) {
            items['key' + index] = pageView;
            continue;
          }

          var keys = Object.keys(items);
          var breakLabelKey = keys[keys.length - 1];
          var breakLabelValue = items[breakLabelKey];

          if (breakLabelValue !== this.props.breakLabel) {
            items['key' + index] = this.props.breakLabel;
          }
        }
      }

      return this.state.isMobile || this.props.mobileAlways ? this.renderMobileListView() : this.renderDesktopListView(items);
    }
  }]);

  return PaginationListView;
}(_react.Component);

exports.default = PaginationListView;
;
//# sourceMappingURL=PaginationListView.js.map