'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MakeModule = require('../../Common/MakeModule');

var _MakeModule2 = _interopRequireDefault(_MakeModule);

var _ActionType = require('../BeforeTable/Action/ActionType');

var _ActionType2 = _interopRequireDefault(_ActionType);

var _ConnectedPageSize = require('../PageSize/Component/Connected/ConnectedPageSize');

var _ConnectedPageSize2 = _interopRequireDefault(_ConnectedPageSize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _MakeModule2.default)('pageSizeBeforeTable', function () {
  return {
    boot: function boot(dispatch) {
      dispatch({
        type: _ActionType2.default.BEFORE_TABLE_REGISTER_COMPONENT,
        row: 1,
        slot: 0,
        component: function component(props) {
          return _react2.default.createElement(
            'div',
            { className: 'page-size' },
            _react2.default.createElement(_ConnectedPageSize2.default, { store: props.store })
          );
        }
      });
    }
  };
});