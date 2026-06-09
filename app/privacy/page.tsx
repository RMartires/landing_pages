export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
        Privacy Policy
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-600">
        <p>
          We collect your email address when you join a product waitlist so we
          can notify you about launch updates for that product.
        </p>
        <p>
          We may also store campaign attribution data such as UTM parameters,
          referrer, browser user agent, and a hashed IP address to understand
          which marketing campaigns drive signups.
        </p>
        <p>
          We do not sell your personal information. You can request deletion of
          your waitlist data by contacting the site operator.
        </p>
        <p>
          This policy applies to all landing pages hosted on this platform.
          Individual product pages may link to additional terms when launched.
        </p>
      </div>
    </main>
  );
}
