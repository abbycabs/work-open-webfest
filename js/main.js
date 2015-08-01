var distance = { 0: 0,
                 1: 0,
                 2: 10,
                 3: 15,
                 4: 20,
                 5: 55,
                 6: 65,
                 7: 80,
                 8: 95 };
    timeline = document.querySelector('.tl'),
    sr = timeline.querySelector('.tl-sr'),
    dr = timeline.querySelector('.tl-dr'),
    start = 4,
    progress = timeline.querySelector('.tl-progress');

// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: false,
  progress: false,
  history: true,
  center: true,

  transition: 'none', // none/fade/slide/convex/concave/zoom

  // Optional reveal.js plugins
  dependencies: [
    { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: 'plugin/zoom-js/zoom.js', async: true },
    { src: 'plugin/notes/notes.js', async: true }
  ]
});

updateTimeline(Reveal.getIndices().h);

Reveal.addEventListener( 'slidechanged', function( event ) {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  updateTimeline(event.indexh);
} );

function updateTimeline(h){
  var status = tlStatus(h);
  timeline.style.display = status.on ? 'block' : 'none';
  (status.rev.sr) ? sr.classList.add('active') : sr.classList.remove('active');
  (status.rev.dr) ? dr.classList.add('active') : dr.classList.remove('active');
  progress.style.height = status.distance;
}

function tlStatus(h) {
  return { on: (h>=start && h<(start+9)),
           rev: {
            'sr': (h>start && h<(start+5)) ? 'active' : '',
            'dr': (h>(start+4)) ? 'active' : ''
           },
           distance: distance[h-start] + "%"
         };
}
