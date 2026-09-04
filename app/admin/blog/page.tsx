"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  Filter,
  Newspaper,
  PlusCircle,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";

type BlogPostItem = {
  _id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  status?: "draft" | "published";
  publishedAt?: string | null;
  createdAt?: string;
};

const ITEMS_PER_PAGE = 8;

export default function AdminBlogListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "all"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    if (page > 1) params.set("page", page.toString());
    const queryString = params.toString();
    router.replace(`/admin/blog${queryString ? `?${queryString}` : ""}`);
  }, [search, statusFilter, categoryFilter, page, router]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => p.category && cats.add(p.category));
    return ["all", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      const matchesSearch =
        search === "" ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.slug?.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [posts, statusFilter, categoryFilter, search]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleTogglePublish = async (post: BlogPostItem) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    setBusyId(post._id);
    try {
      const res = await fetch(`/api/admin/blog/${post._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === post._id ? { ...p, status: nextStatus } : p
          )
        );
        alert(
          `Post ${nextStatus === "published" ? "published" : "unpublished"} successfully!`
        );
      } else {
        const errorData = await res.json();
        alert(`Failed to update status: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status. Please check network connection.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (post: BlogPostItem) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${post.title || "this post"}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setBusyId(post._id);
    try {
      const res = await fetch(`/api/admin/blog/${post._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== post._id));
        alert("Blog post deleted successfully!");
      } else {
        const errorData = await res.json();
        alert(`Failed to delete: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post. Please check network connection.");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 space-y-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <span className="text-sm font-medium text-muted-foreground">
          Loading blog posts...
        </span>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Blog</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create, edit, publish, and delete blog posts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 flex gap-1.5 items-center">
            <Newspaper className="h-3.5 w-3.5" />
            Total: {posts.length} Posts
          </Badge>
          <Button asChild className="flex items-center gap-2">
            <Link href="/admin/blog/create">
              <PlusCircle className="h-4 w-4" />
              Add New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Search + Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or slug..."
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                className="pl-9"
              />
            </div>

            <div className="flex items-center gap-2 md:w-1/4">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setPage(1);
                  setStatusFilter(e.target.value);
                }}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center gap-2 md:w-1/4">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setPage(1);
                  setCategoryFilter(e.target.value);
                }}
                className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      {paginatedPosts.length > 0 ? (
        <Card className="shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b">
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPosts.map((post) => (
                  <tr key={post._id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{post.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        /{post.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {post.category || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={busyId === post._id}
                          onClick={() => handleTogglePublish(post)}
                          title={post.status === "published" ? "Unpublish" : "Publish"}
                        >
                          {post.status === "published" ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/admin/blog/${post._id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          disabled={busyId === post._id}
                          onClick={() => handleDelete(post)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center text-muted-foreground shadow-sm">
          No blog posts found matching your filter criteria.
        </Card>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-4 px-2">
          <span className="text-xs text-muted-foreground">
            Showing page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
