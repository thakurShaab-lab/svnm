"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface FaqFormData {
  question: string;
  answer: string;
  status: "active" | "inactive";
  order: number | "";
}

const EMPTY_FORM: FaqFormData = {
  question: "",
  answer: "",
  status: "active",
  order: "",
};

export default function EditFaqPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FaqFormData>(EMPTY_FORM);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch(`/api/admin/faq/${id}`);
        const data = await res.json();
        if (data.success && data.faq) {
          setFormData({
            question: data.faq.question || "",
            answer: data.faq.answer || "",
            status: data.faq.status === "inactive" ? "inactive" : "active",
            order: typeof data.faq.order === "number" ? data.faq.order : "",
          });
        } else {
          setMessage(`Error: ${data.error || "FAQ not found"}`);
        }
      } catch (err) {
        setMessage("Failed to load FAQ");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFaq();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("Saving...");

    try {
      const payload = {
        ...formData,
        order: formData.order === "" ? undefined : Number(formData.order),
      };

      const response = await fetch(`/api/admin/faq/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("FAQ updated successfully!");
        setTimeout(() => router.push("/admin/faq"), 800);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to update FAQ: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">
          Loading FAQ...
        </span>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center gap-3 bg-background p-6 rounded-xl border shadow-sm">
        <div className="p-3 bg-rose-500/10 text-rose-600 rounded-lg">
          <HelpCircle className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit FAQ</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update this frequently asked question.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">FAQ Details</CardTitle>
            <CardDescription>Question, answer, status, and order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="question" className="text-xs uppercase font-medium">Question *</Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, question: e.target.value }))
                }
                rows={2}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="answer" className="text-xs uppercase font-medium">Answer *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, answer: e.target.value }))
                }
                rows={5}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs uppercase font-medium">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "active" | "inactive",
                    }))
                  }
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="order" className="text-xs uppercase font-medium">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: e.target.value === "" ? "" : Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={saving || !formData.question.trim() || !formData.answer.trim()}
            className="w-full font-medium"
            size="lg"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Saving Changes...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg border text-sm flex items-center gap-2 ${
              message.includes("Error") || message.includes("Failed")
                ? "bg-destructive/10 border-destructive/20 text-destructive"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {message.includes("Error") || message.includes("Failed") ? (
              <AlertCircle className="h-4 w-4 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}
      </form>
    </main>
  );
}
