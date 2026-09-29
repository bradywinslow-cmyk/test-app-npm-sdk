export default function BonusPage() {
  // window.Sprig?.track('new_event_five');
  
  return (
    <main className="mx-auto p-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold mb-2">Bonus Page!!!</h1>
      </header>
      <section className="mx-auto max-w-3xl">
        <h2 className="text-lg font-medium mb-2">Sprig Link Survey iframe test</h2>
        <iframe
          src="https://a.sprig.com/TExMMGh4VzlwSlJzfnNpZDo1NTcyY2M4MC1mMjRkLTQzZDgtYjkzNC03M2MyOTVjMjZmNWM="
          title="Sprig Link Survey"
          width="100%"
          height="600"
          style={{ border: "1px solid #ccc" }}
        />
      </section>
    </main>
  );
}
