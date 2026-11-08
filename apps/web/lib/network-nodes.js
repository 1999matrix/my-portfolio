import * as THREE from "three";

/** Deterministic node layout — avoids Math.random during render (React purity). */
function unitFloat(index, salt) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function buildNetworkNodes(count = 48) {
  const pts = [];
  for (let i = 0; i < count; i += 1) {
    pts.push(
      new THREE.Vector3(
        (unitFloat(i, 1) - 0.5) * 4,
        (unitFloat(i, 2) - 0.5) * 2.5,
        (unitFloat(i, 3) - 0.5) * 2,
      ),
    );
  }
  return pts;
}

export function buildNetworkEdges(nodes, maxDistance = 1.35) {
  const pairs = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if (nodes[i].distanceTo(nodes[j]) < maxDistance) {
        pairs.push([nodes[i], nodes[j]]);
      }
    }
  }
  return pairs;
}
