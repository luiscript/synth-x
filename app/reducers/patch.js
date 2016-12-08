import * as types from '../actions/actionTypes';
import joint from 'jointjs';

const initialState = {
  graph: new joint.dia.Graph()
};


export default function newPatch( state = initialState, action = {} ){
  switch (action.type) {
    case types.NEWPAPER:
      const paper = new joint.dia.Paper({
         el: action.placeholder,
         width: '100%',
         height: 600,
         model: state.graph,
         gridSize: 1,
         defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        }),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            // Prevent linking from input ports.
            if (magnetS && magnetS.getAttribute('type') === 'input') return false;
            // Prevent linking from output ports to input ports within one element.
            if (cellViewS === cellViewT) return false;
            // Prevent linking to input ports.
            return magnetT && magnetT.getAttribute('type') === 'input';
        },
        validateMagnet: function(cellView, magnet) {
            // Note that this is the default behaviour. Just showing it here for reference.
            // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
            return magnet.getAttribute('magnet') !== 'passive';
        }
      });

      return {
        ...state,
        paper
      }
    case types.NEWPATCH:

      var m1 = new joint.shapes.devs.Model({
        position: { x: 50, y: 50 },
        size: { width: 90, height: 90 },
        inPorts: ['in1','in2'],
        outPorts: ['trigger'],
        attrs: {
            '.label': { text: 'Model', 'ref-x': .5, 'ref-y': .8 },
            rect: { fill: '#2ECC71' },
            '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
            '.outPorts circle': { fill: '#E74C3C', type: 'output' }
        }
      });
      state.graph.addCell(m1);
      return {
        ...state,
      }
    default:
      return state;
  }
}
