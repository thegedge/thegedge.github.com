import { countBy, flatMap } from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { Tag } from "../../../lib/components/Tag";
import { Layout } from "../../../lib/layouts/Layout";
import allPosts from "../../../lib/posts";
import { stableColors } from "../../../lib/utils";

export default function Tags(props: { tags: Record<string, number> }) {
  const colors = stableColors(Object.keys(props.tags));
  return (
    <Layout description="All tags in Jason Gedge's blog" title="Blog Tags">
      <div className="grid grid-cols-4 gap-x-4 gap-y-12 text-center">
        {Object.entries(colors).map(([tag, color]) => (
          <a href={`/blog/tags/${encodeURIComponent(tag)}`}>
            <Tag color={colors[tag]}>
              {tag} ({props.tags[tag].toString()})
            </Tag>
          </a>
        ))}
      </div>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps = async (_context) => {
  const posts = await allPosts();
  return { props: { tags: countBy(flatMap(posts, "tags")) } };
};
