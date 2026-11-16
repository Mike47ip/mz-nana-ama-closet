import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'Contact | Nana Ama Closet.' };

export default function Contact() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2">
      <div>
        <h1 className="font-display text-5xl font-semibold">Contact us</h1>
        <p className="mb-6 mt-2 text-muted">Questions about sizing, orders or styling? Write to us.</p>
        {[['Email', 'hello@adwoaandco.example'], ['WhatsApp', '+233 00 000 0000'], ['Hours', 'Monday to Saturday, 9am to 6pm']].map(([a, b]) => (
          <p key={a} className="mb-4 text-muted"><b className="block text-ink">{a}</b>{b}</p>
        ))}
      </div>
      <ContactForm />
    </section>
  );
}
