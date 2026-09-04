"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Newspaper,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { slugify } from "@/lib/slugify";

interface BlogFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  imageUrl?: string;
  author: string;
  category: string;
  status: "draft" | "published";
}

const EMPTY_FORM: BlogFormData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  imageUrl: "",
  author: "",
  category: "",
  status: "draft",
};

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<BlogFormData>(EMPTY_FORM);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();
        if (data.success && data.post) {
          setFormData({
            slug: data.post.slug || "",
            title: data.post.title || "",
            excerpt: data.post.excerpt || "",
            content: data.post.content || "",
            featuredImage: data.post.featuredImage || "",
            imageUrl: data.post.imageUrl || "",
            author: data.post.author || "",
            category: data.post.category || "",
            status: data.post.status === "published" ? "published" : "draft",
          });
        } else {
          setMessage(`Error: ${data.error || "Blog post not found"}`);
        }
      } catch (err) {
        setMessage("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const previousImageId = formData.featuredImage;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: uploadFormData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        featuredImage: data.imageId,
        imageUrl: `/api/images/${data.imageId}`,
      }));

      if (previousImageId) {
        fetch(`/api/images/${previousImageId}`, { method: "DELETE" }).catch((err) =>
          console.error("Failed to delete old image:", err)
        );
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    if (!formData.featuredImage) return;
    if (!confirm("Remove this featured image?")) return;

    const imageId = formData.featuredImage;
    setFormData((prev) => ({ ...prev, featuredImage: "", imageUrl: "" }));

    try {
      await fetch(`/api/images/${imageId}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete image from storage:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("Saving...");

    try {
      const { imageUrl, ...payload } = formData;

      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Blog post updated successfully!");
        setTimeout(() => router.push("/admin/blog"), 800);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Failed to update blog post: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">
          Loading blog post...
        </span>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center gap-3 bg-background p-6 rounded-xl border shadow-sm">
        <div className="p-3 bg-sky-500/10 text-sky-600 rounded-lg">
          <Newspaper className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Blog Post</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update the content, image, or status of this post.
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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
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
                <Label className="text-xs uppercase font-medium block">Featured Image</Label>
                {formData.imageUrl ? (
                  <div className="flex items-center gap-4 p-3 bg-muted/20 border rounded-lg">
                    <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-background shrink-0 shadow-sm">
                      <Image
                        src={formData.imageUrl}
                        alt={formData.title || "featured image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="h-8"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-3.5 w-3.5 mr-1.5" /> Change Image
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={uploading}
                        onClick={handleRemoveImage}
                        className="h-8"
                      >
                        <X className="h-3.5 w-3.5 mr-1.5" /> Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-muted/30 transition-all"
                  >
                    {uploading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    ) : (
                      <>
                        <ImageIcon className="h-6 w-6 mb-1 text-muted-foreground" />
                        <span className="text-xs font-medium">Click to upload image</span>
                      </>
                    )}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
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
            disabled={saving || !formData.slug || !formData.title}
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
