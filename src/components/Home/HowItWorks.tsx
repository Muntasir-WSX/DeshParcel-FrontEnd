const steps = [
  { step: "01", title: "Book Pickup", desc: "Fill out the online booking form with pickup and delivery details." },
  { step: "02", title: "Parcel Collection", desc: "Our rider collects your parcel directly from your doorstep." },
  { step: "03", title: "Safe Transit", desc: "Your item is processed and dispatched via secure transit hubs." },
  { step: "04", title: "Successful Delivery", desc: "Delivered safely to the recipient with live delivery confirmation." },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.577_0.245_27.325)] mb-2 block">Simple Process</span>
        <h2 className="text-3xl font-bold tracking-tight font-heading mb-3">How DeshParcel Works</h2>
        <p className="text-muted-foreground text-sm">Send your packages in 4 easy steps without any hassle.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((item, idx) => (
          <div key={idx} className="relative p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between">
            <span className="absolute -top-4 right-6 text-4xl font-black text-muted/30 font-heading">{item.step}</span>
            <div>
              <div className="w-10 h-10 rounded-full bg-[oklch(0.577_0.245_27.325)] text-white font-bold flex items-center justify-center mb-4 text-sm">
                {item.step}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}