"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Newspaper, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { slugify } from "@/lib/slugify";

interface BlogFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  status: "draft" | "published";
}

export default function AddBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "",
    category: "",
    status: "draft",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImageFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Please select a valid image file");
      setImageFile(null);
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error("No image file selected");
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", imageFile);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: uploadFormData,
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to upload image");
    }

    return data.imageId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Processing...");

    try {
      let finalImageId = formData.featuredImage;
      if (imageFile) {
        finalImageId = await uploadImage();
      }

      const postToSubmit = {
        ...formData,
        featuredImage: finalImageId,
      };

      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postToSubmit),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Blog post "${formData.title}" added successfully!`);
        setTimeout(() => router.push("/admin/blog"), 800);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to add blog post: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center gap-3 bg-background p-6 rounded-xl border shadow-sm">
        <div className="p-3 bg-sky-500/10 text-sky-600 rounded-lg">
          <Newspaper className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Blog Post</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Publish a new article to the public blog.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Basic Information</CardTitle>
              <CardDescription>Title, slug, and category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title" className="text-xs uppercase font-medium">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      title,
                      slug: slugify(title),
                    }));
                  }}
                  placeholder="e.g. Advances in Optical Profilometry"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slug" className="text-xs uppercase font-medium">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  placeholder="auto-generated-slug"
                  className="font-mono text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs uppercase font-medium">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="e.g. Industry News"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="author" className="text-xs uppercase font-medium">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="e.g. SV Nanometrology Team"
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image + Status */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Featured Image & Status</CardTitle>
              <CardDescription>Cover image and publish state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="image-input" className="text-xs uppercase font-medium">Upload File</Label>
                <Input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {imageFile && (
                  <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Selected: {imageFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-xs uppercase font-medium">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "draft" | "published",
                    }))
                  }
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Excerpt & Content */}
        <div className="grid gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Excerpt</CardTitle>
              <CardDescription>Short summary shown on the blog listing</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="Brief high-level overview..."
                rows={2}
                required
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Content</CardTitle>
              <CardDescription>
                Written in Markdown (headings, **bold**, lists, [links](url)) — rendered as formatted text on the public page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder={"## Heading\n\nWrite the full article here in Markdown..."}
                rows={14}
                className="font-mono text-sm"
                required
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !formData.slug || !formData.title}
            className="w-full font-medium"
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Adding Post...
              </span>
            ) : (
              "Add Blog Post"
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
