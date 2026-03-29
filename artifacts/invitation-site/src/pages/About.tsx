export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Our Story</h1>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <p className="text-xl text-foreground font-medium mb-8 text-center">
            Vows & Knots was born from a simple belief: your wedding invitation is the prologue to your beautiful story. It deserves to be breathtaking.
          </p>

          <p>
            In a world rapidly moving towards digital, we noticed that many e-invites lacked the warmth, elegance, and traditional essence of physical cards. We set out to change that. Our mission is to blend the rich heritage of Indian wedding aesthetics with modern, eco-friendly digital formats.
          </p>

          <h3>Crafting Memories, Not Just Files</h3>
          <p>
            Every template in our collection is carefully designed by artists who understand the cultural significance of Indian weddings. From the intricate mandalas to the auspicious motifs, we ensure that while the medium is modern, the soul remains deeply rooted in tradition.
          </p>

          <h3>Why Go Digital?</h3>
          <ul className="space-y-2 mb-8">
            <li><strong>Eco-Friendly:</strong> Celebrate your love without leaving a carbon footprint.</li>
            <li><strong>Instant Delivery:</strong> Reach loved ones across the globe in seconds.</li>
            <li><strong>Interactive:</strong> Add maps, RSVP links, and music—things paper can't do.</li>
            <li><strong>Cost-Effective:</strong> Premium design without the massive printing bills.</li>
          </ul>

          <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/10 text-center">
            <h3 className="mt-0 text-primary">Join Our Journey</h3>
            <p className="mb-0">
              We have had the honor of being a small part of thousands of love stories. We would be thrilled to be a part of yours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
