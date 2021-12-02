import SVG from "https://cdn.skypack.dev/svg.js";
import {
  spline,
  map
} from "https://cdn.skypack.dev/@georgedoescode/generative-utils@1.0.0";
import { Vector2D } from "https://cdn.skypack.dev/@georgedoescode/vector2d@1.0.1";
import debounce from "https://cdn.skypack.dev/debounce@1.2.1";

let mousePos = new Vector2D(0, 0);
window.mouseHasMoved = false;

const svg = SVG(document.querySelector("svg"));
const path = document.getElementById("baseBtnPath");

const pointOrigins = pointsInPath(path, 32);
const points = pointsInPath(path, 32);
const bgPoints = pointsInPath(path, 32);

let btnPathData = spline(points, 1, true);
let bgPathData = spline(bgPoints, 1, true);

const bgPath = svg
  .path(btnPathData)
  .fill("#A78BFA")
  .attr("id", "bgPath")
  .attr("filter", "url(#shadow)");
const btnPath = svg
  .path(btnPathData)
  .fill("url(#gradient)")
  .attr("id", "btnPath");

const circles = [];

points.forEach((p) => {
  circles.push(
    svg.circle(4).cx(p.x).cy(p.y).fill("#4C1D95").attr("class", "debug-dot")
  );
});

function pointsInPath(path, numPoints = 10) {
  const pathLength = path.getTotalLength();
  const step = pathLength / numPoints;
  const points = [];

  for (let i = 0; i < pathLength; i += step) {
    points.push(path.getPointAtLength(i));
  }

  return points;
}

const pt = svg.node.createSVGPoint();
function transformCoords(evt) {
  pt.x = evt.clientX;
  pt.y = evt.clientY;

  return pt.matrixTransform(svg.node.getScreenCTM().inverse());
}

const range = 40;

(function animate() {
  if (window.mouseHasMoved) {
    points.forEach((p, index) => {
      const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
      const d = Vector2D.sub(point, mousePos);
      const l = Math.hypot(d.x, d.y);
      let y;

      if (l < range && !p.reset) {
        point.sub(new Vector2D(d.x, -(d.y * 0.675)));
        y = point.y;
      } else {
        y = pointOrigins[index].y;
      }

      p.y += (y - p.y) * 0.1;

      circles[index].attr("cy", p.y);
    });

    bgPoints.forEach((p, index) => {
      const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
      const d = Vector2D.sub(point, mousePos);
      const l = Math.hypot(d.x, d.y);
      let y;

      if (l < range && !p.reset) {
        point.sub(new Vector2D(d.x, -(d.y * 0.675)));
        y = point.y;
      } else {
        y = pointOrigins[index].y;
      }

      p.y += (y - p.y) * 0.05;
    });
  }

  bgPathData = spline(bgPoints, 1, true);
  bgPath.attr("d", bgPathData);

  btnPathData = spline(points, 1, true);
  btnPath.attr("d", btnPathData);

  requestAnimationFrame(animate);
})();

window.addEventListener("mousemove", (e) => {
  const { x, y } = transformCoords(e);

  mousePos.x = x;
  mousePos.y = y;

  mouseHasMoved = true;

  points.forEach((p, index) => {
    const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
    const d = Vector2D.sub(point, mousePos);
    const l = Math.hypot(d.x, d.y);

    if (l < range) {
      p.reset = false;
      debounce(() => {
        p.reset = true;
      }, 200)();
    } else {
      p.reset = false;
    }
  });

  bgPoints.forEach((p, index) => {
    const point = new Vector2D(pointOrigins[index].x, pointOrigins[index].y);
    const d = Vector2D.sub(point, mousePos);
    const l = Math.hypot(d.x, d.y);

    if (l < range) {
      p.reset = false;
      debounce(() => {
        p.reset = true;
      }, 200)();
    } else {
      p.reset = false;
    }
  });
});

document.querySelector(".debug-text").addEventListener("click", (e) => {
  if (document.body.classList.contains("debug")) {
    document.body.classList.remove("debug");
  } else {
    document.body.classList += "debug";
  }
});
