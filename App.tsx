import React, { useState } from "react";
import { GitHubUser } from "./types/github";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false); // ← ローディング状態

  /**
   * GitHubユーザー情報を取得する.
   * 入力されたユーザー名を元にGitHub APIへリクエストを送り、結果をstateに格納する.
   */
  const fetchUser = async () => {
    setIsLoading(true); // 通信開始
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("API通信エラー:", error);
    } finally {
      setIsLoading(false); // 通信終了
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GitHubユーザー検索</Text>
      <TextInput
        style={styles.input}
        placeholder="GitHubユーザー名を入力"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="検索" onPress={fetchUser} />

      {/* ローディング表示 */}
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      )}

      {/* ユーザーデータが取得済みかつローディング中でない場合に表示 */}
      {userData && !isLoading && (
        <View style={styles.result}>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.name}>
            {userData.name} (@{userData.login})
          </Text>
          <Text>{userData.bio}</Text>
          <Text>場所: {userData.location}</Text>
          <Text>ブログ: {userData.blog}</Text>
          <Text>公開リポジトリ: {userData.public_repos}</Text>
          <Text>フォロワー: {userData.followers}</Text>
          <Text>フォロー中: {userData.following}</Text>
          <Text>
            作成日: {new Date(userData.created_at).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  result: { marginTop: 20, alignItems: "center" },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 18, fontWeight: "bold" },
});
