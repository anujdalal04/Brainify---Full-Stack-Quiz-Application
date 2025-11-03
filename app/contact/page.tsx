import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-pretty">
        <span className="gradient-text">Contact Us</span>
      </h1>
      <p className="mt-2 text-muted-foreground">Get in touch with the Brainify team</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="soft-card">
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Have questions or feedback? Reach out to us via email and we'll get back to you as soon as possible.
            </p>
            <a href="mailto:support@brainify.com" className="text-primary hover:underline font-medium">
              support@brainify.com
            </a>
          </CardContent>
        </Card>

        <Card className="soft-card">
          <CardHeader>
            <CardTitle>Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Need help with your account or have technical issues? Our support team is here to assist you.
            </p>
            <Button className="btn-gradient rounded-full px-5">Contact Support</Button>
          </CardContent>
        </Card>

        <Card className="soft-card md:col-span-2">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  placeholder="Your message here..."
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button className="btn-gradient rounded-full px-5 w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
