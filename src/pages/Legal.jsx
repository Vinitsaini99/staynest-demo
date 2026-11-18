import { SITE } from '../config/site'
import { useSeo } from '../hooks/useSeo'
import { PageHero } from '../components/ui/Bits'

function Doc({ title, path, description, children }) {
  useSeo({ title, description, path })
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ label: 'Home', to: '/' }, { label: title }]} />
      <div className="container-x py-14"><div className="prose-kkp max-w-3xl">{children}</div></div>
    </>
  )
}

export const Privacy = () => (
  <Doc title="Privacy Policy" path="/privacy-policy" description={`How ${SITE.name} collects, uses and protects your information.`}>
    <p><em>This is a template policy for a demonstration build. Have it reviewed by a legal professional before launch.</em></p>
    <h2>Information we collect</h2>
    <p>When you register, enquire or list a property we collect details you provide, such as your name, mobile number, email address, property details and images.</p>
    <h2>How we use it</h2>
    <ul><li>To respond to your enquiries and connect you with owners</li><li>To review and publish property submissions</li><li>To maintain your account and saved properties</li><li>To improve our service</li></ul>
    <h2>Sharing</h2>
    <p>Your enquiry details are shared with the relevant owner or our listing desk so they can respond. We do not sell your personal information.</p>
    <h2>Your choices</h2>
    <p>You may request correction or deletion of your information by contacting us at {SITE.email}.</p>
  </Doc>
)

export const Terms = () => (
  <Doc title="Terms & Conditions" path="/terms-and-conditions" description={`Terms of use for ${SITE.name}.`}>
    <p><em>This is a template for a demonstration build. Have it reviewed by a legal professional before launch.</em></p>
    <h2>Use of the platform</h2>
    <p>{SITE.name} provides a platform for listing and discovering property. We are not a party to any rental arrangement between tenant and owner.</p>
    <h2>Accuracy of listings</h2>
    <p>Listing information is provided by owners or our desk and should be independently verified, including ownership, rent, deposit and availability, before any payment.</p>
    <h2>User responsibilities</h2>
    <p>Do not submit false, misleading or unlawful content. Never make payments outside verified channels.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent permitted by law, we are not liable for losses arising from reliance on listing information or dealings between users.</p>
  </Doc>
)
